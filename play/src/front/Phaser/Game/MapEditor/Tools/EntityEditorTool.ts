import { CommandConfig, EntityPrefab } from "@workadventure/map-editor";
import { EditMapCommandMessage } from "@workadventure/messages";
import { Unsubscriber } from "svelte/store";
import { mapEditorSelectedEntityPrefabStore } from "../../../../Stores/MapEditorStore";
import { GameMapFrontWrapper } from "../../GameMap/GameMapFrontWrapper";
import { GameScene } from "../../GameScene";
import { MapEditorModeManager } from "../MapEditorModeManager";
import { MapEditorTool } from "./MapEditorTool";

export class EntityEditorTool extends MapEditorTool {
    private scene: GameScene;
    private mapEditorModeManager: MapEditorModeManager;

    private entityPrefab: EntityPrefab | undefined;
    private entityPrefabPreview: Phaser.GameObjects.Image | undefined;

    private mapEditorSelectedEntityPrefabStoreUnsubscriber!: Unsubscriber;

    constructor(mapEditorModeManager: MapEditorModeManager) {
        super();
        this.mapEditorModeManager = mapEditorModeManager;
        this.scene = this.mapEditorModeManager.getScene();

        this.entityPrefab = undefined;
        this.entityPrefabPreview = undefined;

        this.subscribeToStores();
    }

    public update(time: number, dt: number): void {}
    public clear(): void {
        this.cleanPreview();
        this.unbindEventHandlers();
    }
    public activate(): void {
        this.bindEventHandlers();
    }
    public destroy(): void {
        this.cleanPreview();
        this.unbindEventHandlers();
        this.mapEditorSelectedEntityPrefabStoreUnsubscriber();
    }
    public subscribeToGameMapFrontWrapperEvents(gameMapFrontWrapper: GameMapFrontWrapper): void {
        console.log("EntityEditorTool subscribeToGameMapFrontWrapperEvents");
    }
    public handleKeyDownEvent(event: KeyboardEvent): void {
        console.log("EntityEditorTool handleKeyDownEvent");
    }
    /**
     * Perform actions needed to see the changes instantly
     */
    public handleCommandExecution(commandConfig: CommandConfig): void {
        console.log("EntityEditorTool handleCommandExecution");
    }
    /**
     * React on commands coming from the outside
     */
    public handleIncomingCommandMessage(editMapCommandMessage: EditMapCommandMessage): void {
        console.log("EntityEditorTool handleIncomingCommandMessage");
    }

    private subscribeToStores(): void {
        this.mapEditorSelectedEntityPrefabStoreUnsubscriber = mapEditorSelectedEntityPrefabStore.subscribe(
            (entityPrefab: EntityPrefab | undefined): void => {
                this.entityPrefab = entityPrefab;
                if (!entityPrefab) {
                    this.entityPrefabPreview?.destroy();
                    this.entityPrefabPreview = undefined;
                } else {
                    this.loadEntityImage(entityPrefab.imagePath, `${entityPrefab.imagePath}`)
                        .then(() => {
                            if (this.entityPrefabPreview) {
                                this.entityPrefabPreview.setTexture(entityPrefab.imagePath);
                            } else {
                                this.entityPrefabPreview = this.scene.add.image(300, 300, entityPrefab.imagePath);
                            }
                        })
                        .catch(() => {
                            console.error("COULD NOT LOAD THE ENTITY PREVIEW TEXTURE");
                        });
                }
                this.scene.markDirty();
            }
        );
    }

    private async loadEntityImage(key: string, url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.scene.textures.exists(key)) {
                resolve();
            }
            this.scene.load.once(`filecomplete-image-${url}`, () => {
                resolve();
            });
            this.scene.load.image(key, url);
            this.scene.load.start();
        });
    }

    private bindEventHandlers(): void {
        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMoveEvent.bind(this), this);
        this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDownEvent.bind(this), this);
    }

    private unbindEventHandlers(): void {
        this.scene.input.off(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMoveEvent.bind(this), this);
        this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDownEvent.bind(this), this);
    }

    private handlePointerMoveEvent(pointer: Phaser.Input.Pointer): void {
        if (this.entityPrefabPreview && this.entityPrefab) {
            if (this.entityPrefab.collisionGrid) {
                const offsets = this.getPositionOffset(this.entityPrefab.collisionGrid);
                this.entityPrefabPreview.setPosition(
                    Math.floor(pointer.worldX / 32) * 32 + offsets.x,
                    Math.floor(pointer.worldY / 32) * 32 + offsets.y
                );
            } else {
                this.entityPrefabPreview.setPosition(Math.floor(pointer.worldX), Math.floor(pointer.worldY));
            }
            this.entityPrefabPreview.setDepth(
                this.entityPrefabPreview.y + this.entityPrefabPreview.displayHeight * 0.5
            );
            this.scene.markDirty();
        }
    }

    private handlePointerDownEvent(pointer: Phaser.Input.Pointer): void {
        if (pointer.rightButtonDown()) {
            this.cleanPreview();
        }
        if (this.entityPrefabPreview && this.entityPrefab) {
            let x = Math.floor(pointer.worldX);
            let y = Math.floor(pointer.worldY);

            if (this.entityPrefab.collisionGrid) {
                const offsets = this.getPositionOffset(this.entityPrefab.collisionGrid);
                x = Math.floor(pointer.worldX / 32) * 32 + offsets.x;
                y = Math.floor(pointer.worldY / 32) * 32 + offsets.y;
            }

            this.scene.getGameMapFrontWrapper().getEntitiesManager().addEntity({
                x,
                y,
                id: 1,
                prefab: this.entityPrefab,
                interactive: true,
            });
            this.scene.markDirty();
        }
    }

    private cleanPreview(): void {
        this.entityPrefabPreview?.destroy();
        this.entityPrefabPreview = undefined;
        this.entityPrefab = undefined;
    }

    private getPositionOffset(collisionGrid?: number[][]): { x: number; y: number } {
        if (!collisionGrid || collisionGrid.length === 0) {
            return { x: 0, y: 0 };
        }
        return {
            x: collisionGrid[0].length % 2 === 1 ? 16 : 0,
            y: collisionGrid.length % 2 === 1 ? 16 : 0,
        };
    }
}

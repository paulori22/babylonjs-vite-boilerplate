import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3,
} from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

export class Card {
    public scene: Scene;
    public mesh: Mesh;

    private name: string = "";
    private description: string = "";
    private points: number = 0;

    constructor(
        scene: Scene,
        name: string,
        description: string,
        points: number,
    ) {
        this.scene = scene;
        this.name = name;
        this.description = description;
        this.points = points;

        this.mesh = MeshBuilder.CreateBox(
            "card_test",
            { width: 0.63, height: 0.68, depth: 0.01 },
            this.scene,
        );

        this.mesh.position = new Vector3(0, 2, -4);

        this.loadCardGui();
    }

    async loadCardGui() {
        const plane = MeshBuilder.CreatePlane("plane", {
            height: 0.67,
            width: 0.63,
        });
        plane.position.z = -0.01;
        plane.position.y = 0;
        plane.parent = this.mesh;

        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            plane,
            0.63 * 512,
            0.67 * 512,
        );

        let loadedGUI = await advancedTexture.parseFromURLAsync(
            "gui/cardGuiTexture.json",
        );
        const titleTextBlock = loadedGUI.getControlByName("title") as TextBlock;
        titleTextBlock.text = this.name;
        const descriptionTextBlock = loadedGUI.getControlByName(
            "description",
        ) as TextBlock;
        descriptionTextBlock.text = this.description;
        const pointLeftTextBlock = loadedGUI.getControlByName(
            "pointLeft",
        ) as TextBlock;
        pointLeftTextBlock.text = this.points.toString();
        const pointRightTextBlock = loadedGUI.getControlByName(
            "pointRight",
        ) as TextBlock;
        pointRightTextBlock.text = this.points.toString();
    }
}

export class Board {
    public scene: Scene;
    public mesh: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;
        this.mesh = MeshBuilder.CreateGround(
            "ground",
            { width: 6, height: 6 },
            this.scene,
        );

        var groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new Texture("texture/grass.jpg", scene);
        this.mesh.material = groundMaterial;
    }
}

export class BuyPile {
    private _pile: Card[] = [];

    public search() {
        //this could be 3 if elfs are in the player garden
        if (this._pile.length >= 2) {
            return [this._pile.shift(), this._pile.shift()];
        }
        return null;
    }

    public buy(quantity: number) {
        if (this._pile.length >= quantity) {
            const buyCards = [];
            for (let i = 0; i < quantity; i++) {
                buyCards.push(this._pile.shift());
            }
            return buyCards;
        }
        return null;
    }

    public addBottom(card: Card) {
        return this._pile.push(card);
    }
}

class DiscardPile {
    private _pile: Card[] = [];

    public add(card: Card) {
        return this._pile.unshift(card);
    }

    public get(index: number) {
        const card = this._pile.find((_, indexCard) => indexCard === index);
        if (card) {
            this._pile = this._pile.splice(index, 1);
            return card;
        }
        return null;
    }

    public getTop() {
        return this._pile.shift();
    }
}

export class DiscardSearchPile extends DiscardPile {}

export class DiscardEndTurnPile extends DiscardPile {}

export class Player {
    public name: string;
    private _points: number = 0;
    private _handCards: Card[] = [];
    private _garden: Card[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public get points(): number {
        return this._points;
    }

    public addPoints(points: number) {
        this._points += points;
    }

    public removePoints(points: number) {
        this._points -= points;
    }

    public get handCards(): Card[] {
        return this._handCards;
    }

    public addHandCard(card: Card) {
        this._handCards = [...this._handCards, card];
    }

    public get garden(): Card[] {
        return this._garden;
    }

    public set garden(cards: Card[]) {
        this._handCards = cards;
    }
}

import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import {
    AdvancedDynamicTexture,
    Button,
    Control,
    Image,
    StackPanel,
    TextBlock,
} from "@babylonjs/gui";

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

        /* const plane = MeshBuilder.CreatePlane("plane", {
            height: 0.67,
            width: 0.63,
        });
        plane.position.z = -0.11;
        plane.position.y = 0;
        plane.parent = this.mesh;

        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            plane,
            0.63 * 512,
            0.67 * 512,
        );

        const panel = new StackPanel();
        panel.verticalAlignment = 0;
        advancedTexture.addControl(panel);

        const cardTitle = new TextBlock("title");
        cardTitle.text = this.name;
        cardTitle.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        cardTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        cardTitle.color = "black";
        cardTitle.fontSize = 24;
        cardTitle.height = "24px";
        cardTitle.paddingTop = 8;
        cardTitle.paddingLeft = 8;
        cardTitle.paddingRight = 8;
        panel.addControl(cardTitle);

        const image = new Image(
            "image",
            "https://extendedcollection.com/wp-content/uploads/2021/05/ec_logo_02.jpg",
        );
        image.height = "184px";
        image.width = "80%";
        image.paddingTop = 8;
        image.paddingLeft = 8;
        image.paddingRight = 8;
        panel.addControl(image);

        const descriptionTextBox = new TextBlock("description");
        descriptionTextBox.fontFamily = "Tahoma, sans-serif";
        descriptionTextBox.text = this.description;
        descriptionTextBox.textWrapping = true;
        descriptionTextBox.color = "black";
        descriptionTextBox.fontSize = 16;
        descriptionTextBox.height = "32px";
        descriptionTextBox.horizontalAlignment = 0;
        descriptionTextBox.verticalAlignment = 0;
        descriptionTextBox.paddingTop = 8;
        descriptionTextBox.paddingLeft = 8;
        descriptionTextBox.paddingRight = 8;
        panel.addControl(descriptionTextBox); */
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

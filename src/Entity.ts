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

/* const createItemCard = () => {
    const cardMat = new StandardMaterial("light2");
    cardMat.diffuseColor = new Color3.FromHexString(brand.dark3);
    cardMat.specularColor = new Color3(0.3, 0.3, 0.3);
    const card = MeshBuilder.CreateBox("detail-card", {
        height: 3.4,
        width: 2,
        depth: 0.2,
    });
    card.material = cardMat;

    const plane = MeshBuilder.CreatePlane("plane", { height: 3.4, width: 2 });
    plane.position.z = -0.11;
    plane.parent = card;

    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
        plane,
        2 * 512,
        3.4 * 512,
    );

    const panel = new StackPanel();
    panel.verticalAlignment = 0;
    advancedTexture.addControl(panel);

    const image = new Image(
        "image",
        "https://extendedcollection.com/wp-content/uploads/2021/05/ec_logo_02.jpg",
    );
    image.height = "1024px";
    image.width = "1024px";
    image.paddingTop = 40;
    image.paddingLeft = 40;
    image.paddingRight = 40;
    panel.addControl(image);

    const title = new TextBlock("title");
    title.text = "Title of a Library Item";
    title.color = "white";
    title.fontSize = 48;
    title.height = "120px";
    title.textHorizontalAlignment = 0;
    title.textVerticalAlignment = 0;
    title.paddingTop = 40;
    title.paddingLeft = 40;
    title.paddingRight = 40;
    panel.addControl(title);

    const description = new TextBlock("description");
    description.fontFamily = "Tahoma, sans-serif";
    description.text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    description.textWrapping = true;
    description.color = "white";
    description.fontSize = 36;
    description.height = "440px";
    description.textHorizontalAlignment = 0;
    description.textVerticalAlignment = 0;
    description.paddingTop = 20;
    description.paddingLeft = 40;
    description.paddingRight = 40;
    panel.addControl(description);

    const button1 = Button.CreateSimpleButton("but1", "Toggle Favorite");
    button1.height = "120px";
    button1.color = "white";
    button1.background = brand.pink;
    button1.fontSize = 50;
    button1.paddingLeft = 40;
    button1.paddingRight = 40;
    button1.onPointerUpObservable.add(function () {
        console.log("button1 clicked");
    });
    button1.verticalAlignment = 1;
    panel.addControl(button1);

    // Some hardcoded transform values – will be replaced
    // card.scaling = new Vector3(0.2, 0.2, 0.2);
    // card.position = new Vector3(0, 1.4, 4);

    card.scaling = new Vector3(0.8, 0.8, 0.8);
    card.position = new Vector3(0, 1.8, 4);

    return card;
}; */
export class Card {
    public scene: Scene;
    public mesh: Mesh;

    private name: string = "";
    private description: string = "";

    constructor(scene: Scene, name: string, description: string) {
        this.scene = scene;
        this.name = name;
        this.description = description;
        this.mesh = MeshBuilder.CreateBox(
            "card_test",
            { width: 0.63, height: 0.68, depth: 0.01 },
            this.scene,
        );

        this.mesh.position = new Vector3(0, 2, -4);

        const plane = MeshBuilder.CreatePlane("plane", {
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
        panel.addControl(descriptionTextBox);
    }
}

//Card Example
/*

    createItemCard = () => {
        const card = MeshBuilder.CreateBox("detail-card", {
            height: 3.2,
            width: 2,
            depth: 0.02,
        });
        card.position = new Vector3(0, 2, -4);

        const plane = MeshBuilder.CreatePlane("plane", {
            height: 3,
            width: 2,
        });
        plane.position.z = -0.11;
        plane.position.y = 0.1;
        plane.parent = card;

        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            plane,
            2 * 512,
            3 * 512,
        );

        const panel = new StackPanel();
        panel.verticalAlignment = 0;
        advancedTexture.addControl(panel);

        const image = new Image(
            "image",
            "https://extendedcollection.com/wp-content/uploads/2021/05/ec_logo_02.jpg",
        );
        image.height = "600px";
        image.width = "600px";
        image.paddingTop = 40;
        image.paddingLeft = 40;
        image.paddingRight = 40;
        panel.addControl(image);

        const title = new TextBlock("title");
        title.text = "Library Item Title";
        title.color = "black";
        title.fontSize = 48;
        title.height = "100px";
        title.textHorizontalAlignment = 0;
        title.textVerticalAlignment = 0;
        title.paddingTop = 40;
        title.paddingLeft = 40;
        title.paddingRight = 40;
        panel.addControl(title);

        const description = new TextBlock("description");
        description.fontFamily = "Tahoma, sans-serif";
        description.text =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        description.textWrapping = true;
        description.color = "black";
        description.fontSize = 24;
        description.height = "660px";
        description.textHorizontalAlignment = 0;
        description.textVerticalAlignment = 0;
        description.paddingTop = 20;
        description.paddingLeft = 40;
        description.paddingRight = 40;
        panel.addControl(description);

        const button1 = Button.CreateSimpleButton("but1", "Toggle Favorite");
        button1.width = 1;
        button1.height = "100px";
        button1.color = "white";
        button1.background = "#C62a88";
        button1.fontSize = 50;
        button1.paddingBottom = 20;
        button1.paddingLeft = 40;
        button1.paddingRight = 40;
        button1.onPointerUpObservable.add(function () {
            console.log("button1 clicked");
        });
        button1.verticalAlignment = 1;
        advancedTexture.addControl(button1);
    };
*/

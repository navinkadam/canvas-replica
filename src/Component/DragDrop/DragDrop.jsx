import "./DragDrop.css";
import { fabric } from "fabric";
import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { getImageSrc } from "../../actions/FetchImages/FetchImage";
import { getFontsList } from "../../actions/FetchFontFamily/FetchFontFamily";

import {
  DrawText,
  Images,
  FontFamily,
  Input,
  TextAlign,
  Download,
  Group,
  Ungroup,
  MultipleSelection,
  Backward,
  Forward,
  RangeBarReact,
  ButtonReact,
  CopyPaste,
  Shapes
} from "../Import/ImportModules";

fabric.Object.prototype.set({
  borderColor: "#53c5bf",
  cornerColor: "#acdab5b8",
  cornerSize: 18,
  padding: 1,
  hasBorders: true,
  rotatingPointOffset: 30,
  cornerStyle: "circle"
  // transparentCorners: true
});

class DragDrop extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  state = {
    canvas: "",
    cloneObject: "",
    imgSrc: [],
    fontFamilys: [],
    selectedColor: "#000000",
    selectedBackGroundColor: "#77a05f",
    selectedFontFamily: "Helvetica Neue",
    fontSize: 30,
    copyPasteVisibility: false,
    textVisibility: false,
    selectedTextAlign: "",
    textAligns: ["left", "right", "center", "justify"]
  };

  drawImage = event => {
    event.e.preventDefault();
    let src = event.e.dataTransfer.getData("imageSrc");
    // event.e.dataTransfer.clearData("imageSrc");
    fabric.Image.fromURL(src, img => {
      img.set({
        left: 10,
        top: 0

        // border: "#000",
        // stroke: "#F0F0F0",
        // strokeWidth: 5
      });
      img.scaleToHeight(500);
      img.scaleToWidth(500);
      this.state.canvas.setActiveObject(img);
      this.state.canvas.add(img).renderAll();
    });
  };

  onChangeFontFamily = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedFontFamily: e.target.value });
      this.state.canvas.getActiveObject().set("fontFamily", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeTextAlign = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedTextAlign: e.target.value });
      this.state.canvas.getActiveObject().set("textAlign", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onRemoveElement = key => {
    this.state.canvas.remove(this.state.canvas.getActiveObject());
  };

  onChangeColor = e => {
    if (this.state.canvas.getActiveObject()) {
      this.setState({ selectedColor: e.target.value });
      this.state.canvas.getActiveObject().set("fill", e.target.value);
      this.state.canvas.renderAll();
    } else {
      return alert("select Text");
    }
  };

  onChangeBackGroundColor = e => {
    this.setState({ selectedBackGroundColor: e.target.value }, () => {
      this.state.canvas.setBackgroundColor(
        this.state.selectedBackGroundColor,
        () => {
          this.state.canvas.renderAll();
        }
      );
    });
  };

  onChangeFontSize = e => {
    if (/^\d*$/.test(e.target.value)) {
      if (this.state.canvas.getActiveObject()) {
        this.setState({ fontSize: e.target.value });
        this.state.canvas
          .getActiveObject()
          .set("fontSize", (e.target.value * 72) / 96);
        this.state.canvas.renderAll();
      } else {
        return alert("select Text");
      }
    }
  };

  componentDidMount() {
    let canvas = new fabric.Canvas(this.canvasRef.current, {
      preserveObjectStacking: true,
      uniScaleTransform: true
    });
    this.setState({ canvas: canvas });

    canvas.on("drop", this.drawImage);

    // visibility show Text Entered
    canvas.on("text:editing:entered", e => {
      this.setState({ textVisibility: true });
    });

    // visibility hidden Text Entered
    canvas.on("text:editing:exited", e => {
      this.setState({ textVisibility: false });
    });

    // visibility show copy
    canvas.on("object:selected", e => {
      this.setState({ copyPasteVisibility: true });
    });
    // visibility hidden copy
    canvas.on("selection:cleared", e => {
      this.setState({ copyPasteVisibility: false });
    });

    document.addEventListener("keydown", key => {
      if (canvas.getActiveObject()) {
        if (key.shiftKey && key.keyCode === 68)
          // 46 delete 68 D key.keyCode === 46 ||
          //selected Object Delete
          this.onRemoveElement();
      }
    });
    this.props.onGetImageSrc();
    this.props.onGetFontsList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imgSrcData.readyState === 4) {
      return { imgSrc: nextProps.imgSrcData.imgSrcList };
    } else if (nextProps.fontListData.readyState === 4) {
      return { fontFamilys: nextProps.fontListData.fontList };
    } else return null;
  }

  componentWillUnmount() {
    this.state.canvas.off("drop");
    document.removeEventListener("keypress");
  }
  render() {
    return (
      <div className="container">
        <div className="left">
          <Images imagesList={this.state.imgSrc} />
        </div>

        <div className="right">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px"
              }}
            >
              <Input
                id="backGroundColor"
                type="color"
                value={this.state.selectedBackGroundColor}
                onChange={this.onChangeBackGroundColor}
                displayText="Background Color"
              />
              <DrawText canvas={this.state.canvas} />
              <Shapes canvas={this.state.canvas} />
              <div style={{ display: "flex" }}>
                <MultipleSelection canvas={this.state.canvas} />
                <div>
                  <button
                    onClick={e =>
                      this.state.canvas.discardActiveObject() &&
                      this.state.canvas.requestRenderAll()
                    }
                  >
                    Deselect
                  </button>
                </div>
              </div>
              <Download canvas={this.state.canvas} />
              <div
                style={{
                  display: "flex"
                }}
                className={!this.state.copyPasteVisibility ? "visibility" : ""}
              >
                <div style={{ display: "flex" }}>
                  <Group canvas={this.state.canvas} />
                  <Ungroup canvas={this.state.canvas} />
                </div>
                <div style={{ display: "flex" }}>
                  <Backward canvas={this.state.canvas} />
                  <Forward canvas={this.state.canvas} />
                </div>
                <RangeBarReact
                  canvas={this.state.canvas}
                  id="transparent"
                  displayText="Transparent"
                  rangeMin={0}
                  rangeMax={100}
                  rangeStep={10}
                  value={100}
                />
                <CopyPaste canvas={this.state.canvas} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "20px"
              }}
              className={!this.state.textVisibility ? "visibility" : ""}
            >
              <FontFamily
                selectedFontFamily={this.state.selectedFontFamily}
                fonts={this.state.fontFamilys}
                onChangeFontFamily={this.onChangeFontFamily}
              />
              <TextAlign
                selectedTextAlign={this.state.selectedTextAlign}
                onChangeTextAlign={this.onChangeTextAlign}
                aligns={this.state.textAligns}
              />
              <Input
                id="fontColor"
                type="color"
                value={this.state.selectedColor}
                onChange={this.onChangeColor}
                displayText="Font Color"
              />
              <Input
                id="fontSize"
                type="text"
                value={this.state.fontSize}
                onChange={this.onChangeFontSize}
                displayText="Font Size"
              />
              <RangeBarReact
                canvas={this.state.canvas}
                id="lineHeight"
                displayText="Line Height"
                rangeMin={0.5}
                rangeMax={2.5}
                rangeStep={0.2}
                value={1.16}
              />

              <RangeBarReact
                canvas={this.state.canvas}
                id="letterSpacing"
                displayText="Letter Spacing"
                rangeMin={-200}
                rangeMax={800}
                rangeStep={1}
                value={10}
              />
              <ButtonReact
                id="bold"
                canvas={this.state.canvas}
                displayText={"B"}
              />
              <ButtonReact
                id="underLine"
                canvas={this.state.canvas}
                displayText={"U"}
              />
              <ButtonReact
                id="italic"
                canvas={this.state.canvas}
                displayText={"I"}
              />
            </div>
          </div>
          <div>
            <canvas
              ref={this.canvasRef}
              height="500%"
              width="700%"
              className="canvas"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { imgSrcData: state.getImagesSrc, fontListData: state.getFontList };
};

const mapDispatchToProps = {
  onGetImageSrc: getImageSrc,
  onGetFontsList: getFontsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDrop);

//Crop images

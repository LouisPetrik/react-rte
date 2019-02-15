import React from "react";
import ContentEditable from "react-contenteditable";
import "./styles/input.css";



class Input extends React.Component {
  constructor() {
    super()
    this.contentEditable = React.createRef();
  };

  state = {
    strong: false,
    italic: false,
    starting: "",
    html: "",
    ending: "",
    clicked: false,
    italicClicked: false
  };
 
  handleChange = (event) => {
    console.log("changed", event.target.value)
    this.setState({html: event.target.value});
  };



  // sorgt dafür, dass die buttons für die textstylings wie italic, strong 
  // usw. mit CSS angepasst werden
  changeStyle = (style) => {
    this.setState(prevState => {
        switch (style) {
          case "bold":
            return { clicked: !prevState.clicked }
        
          case "italic":
            return { italicClicked: !prevState.italicClicked }
      
        }
      }, ()=> console.log(this.state.clicked, this.state.italicClicked));
  };

  // handled, dass aktive stylings bei einen Zeilenumbruch/Leertaste abgebrochen werden
  handleKeys = (event) => {
    switch (event.keyCode) {
      case 32:
        console.log("Space"); this.setState({clicked: false, italicClicked: false})
      break;
      case 13:
        console.log("Enter"); this.setState({clicked: false, italicClicked: false})
      break;
    };
  };

  // damit der user doppelklick auf text machen kann und diesen nachträglich editieren kann
  // NUR BEISPIEL AKTUELL
  handleDoubleClick = () => {
    function replaceSelectionWithHtml(html) {
      var range;
      if (window.getSelection && window.getSelection().getRangeAt) {
          range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          var div = document.createElement("div");
          div.innerHTML = html;
          var frag = document.createDocumentFragment(), child;
          while ( (child = div.firstChild) ) {
              frag.appendChild(child);
          }
          range.insertNode(frag);
      } else if (document.selection && document.selection.createRange) {
          range = document.selection.createRange();
          range.pasteHTML(html);
      }
  }
  
  replaceSelectionWithHtml("<b>REPLACEMENT HTML</b>");

  }

  
  render() {
    return (
      <React.Fragment>
        <button 
          onClick={() => this.changeStyle("bold")}
          className={this.state.clicked ? "active" : "primary"}>
          Dick
        </button>

        <button 
          onClick={() => this.changeStyle("italic")}
          className={this.state.italicClicked ? "active": "primary"}
        >
          italic
        </button>

        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          //disabled={false}       // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
          onKeyDown={this.handleKeys}
          tagName='article' 
          onDoubleClick={this.handleDoubleClick}
        />

      </React.Fragment>
    );
  };
};

export default Input;
import React from "react";
import Popup from "reactjs-popup";



export default function BasePopup({ children, popupRef }) {
    const childs = React.Children.toArray(children);
    const trigger = childs.filter((child) => child?.props?.id === "trigger")[0];
    return (
        <Popup ref={popupRef} trigger={trigger} modal nested contentStyle={{
            width: "100%", maxWidth: "700px", padding: "50px 0", maxHeight: "100%", overflowY: "auto",
            background: "transparent", border: 0, display: "flex", justifyContent: "center"
        }}>
            <div>{childs.filter((child) => child.props.id !== "trigger")}</div>
        </Popup>
    );
}

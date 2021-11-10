import React, { useState } from "react";
import TableSections from "../Tables/TableSections";
import { uid } from 'uid';
import { allowedColors } from "../../allowedColors";
import Chart from "../Chart/Chart";

function UserScreen(props){
    const {colors, editColorCount, deleteColor, addColor, removeTrendingColor} = props;
    const [stateColorValue , setStateColorInput] = useState("")
    
    const colorChangeHandler = (event) => setStateColorInput(event.target.value);

    const handleDeleteClick = () => {
        if(stateColorValue === ""){
            props.showError('Please enter a color you want to deleted');
        } else {
            const name = stateColorValue.charAt(0).toUpperCase() + stateColorValue.slice(1).toLowerCase();
            const colorToBeDeleted = colors.find(color => color.colorName === name)
            if (colorToBeDeleted){
                deleteColor(colorToBeDeleted.id)
            } else {
                props.showError(`This ${name} is not on our requested colors😤`);
            }
        }
        setStateColorInput("")
    }

    const handleRequestClick = () => {
        if(stateColorValue === ""){
            props.showError('Please enter a color');
        } else {
            const name = stateColorValue.charAt(0).toUpperCase() + stateColorValue.slice(1).toLowerCase();
            if (allowedColors.includes(name)){
                    addColor({
                        id: uid(),
                        colorName: name,
                        counter: 1,
                        type: "upAndComing"
                    })
                    props.showError(null)
            } else {
                props.showError(`${name} is not supported`);
            }
            
        }
    }


    return(
        
        <div className="container">
            <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 threeButton">
                    <input type="text" 
                        name="color" 
                        id="color" 
                        className="form__input"
                        value={stateColorValue} 
                        placeholder="Request/Delete/Edit color"
                        onChange={colorChangeHandler}
                    /> <br /><br />
                    <button className="btn btn-outline-success" onClick={handleRequestClick}>
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>

                    <button className="btn btn-outline-danger" onClick={handleDeleteClick}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>

                    <br />
                    <Chart colors={colors}/>
                </div>
                <div class="w-20"></div>

                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" style={{float: "right"}}>
                    <TableSections deleteColor={deleteColor} editColorCount={editColorCount} addColor={addColor} removeTrendingColor={removeTrendingColor} colors={colors}/>
                </div>
            </div>
    	</div>
    )
}

export default UserScreen;
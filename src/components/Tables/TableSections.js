import React, { useEffect, useState } from 'react'
import "./Table.css"

function TableSections(props){
    const { colors, deleteColor, editColorCount, removeTrendingColor, addColor}  = props;
    const [fiveMinutesLeft, setFiveMinutesLeft] = useState(30);

	useEffect(() => {
        if (fiveMinutesLeft > 0) {
        const timerId = setTimeout(() => {
            setFiveMinutesLeft(fiveMinutesLeft - 1);
        }, 1000);
            return () => clearTimeout(timerId);
        } else {
            removeTrendingColor()
            setFiveMinutesLeft(10)
        }
    });

    const addCurrentColorTable = (color) => {
        addColor(color)
    }

    const subCurrentColorTable = (color) => {
        if(color.counter === 1){
            deleteColor(color.id)
        } else {
            editColorCount(color.colorName)
        }
    }
    
    const SortAndGroup = (type) => {
        const colorRows = [];
        colors.map(color => {
            if(type === color.type){
                const row = (
                    <tr key={color.id}>
                        <th scope="row" style={{ color: color.colorName }}>{color.colorName}</th>
                        <td style={{ color: color.colorName }}> 
                            <i class="fa fa-plus" aria-hidden="true" onClick={() => addCurrentColorTable(color)}></i> 
                             {color.counter}
                            <i class="fa fa-minus" aria-hidden="true" onClick={() => subCurrentColorTable(color)}></i> 
                        </td>
                    </tr>
                );
                colorRows.push(row);
            }
        })
        return colorRows
    }

    const displayTime = (seconds) => {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60
      
        return [hours, minutes, seconds % 60].map(format).join(':')
    }

    return(
        
        <table >
            <thead>
            <tr>
                <th scope="col">Trending</th>
                <th scope="col">Popular</th>
                <th scope="col">Up and Coming</th>
            </tr>
            </thead>
            
            <tfoot>
            <tr>
                <td colSpan="3">Data will refresh in {displayTime(fiveMinutesLeft)}</td>
            </tr>
            </tfoot>
            <tbody>
            <tr>
                <td>{SortAndGroup("trending")}</td>
                <td>{SortAndGroup("popular")}</td>
                <td>{SortAndGroup("upAndComing")}</td>
            </tr>
            </tbody>
      </table>
    )
}

export default TableSections;

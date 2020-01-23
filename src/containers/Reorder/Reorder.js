import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { addItem, reorderItem, delItem } from  '../../store/actions/index-actions';
import IonClose from 'react-ionicons/lib/MdTrash';

class Reorder extends Component {

	state = {
		item:'',
	}

	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	onDragEnd = result => {
		console.log(result);
		if (!result.destination) {
		return;
		}
		const items = this.reorder(
		this.props.items,
		result.source.index,
		result.destination.index
		);
		this.props.reorderItem(items);
	};

	handle_change = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevstate => {
		const newState = { ...prevstate };
		newState[name] = value;
		return newState;
		})
	};

    headers = {
			"Content-Type": "application/json",
    		accept: "application/json",
		}
    

    render() {
    return (
      <Aux>
        <div style={{ width:"100%", margin:"0px", textAlign:"center", padding:"0px"}}>
        	<br/>
			<label htmlFor="Input"><h3>Playlist</h3></label>
			<div className="form-group">
				<input type="text" className="form-control" id="Input" name="item" placeholder="Enter Video Link" onChange={this.handle_change} value={this.state.item}/>
				<strong style={{color:"red"}} >{this.props.linkError}</strong>
			</div>
			<button className="btn btn-primary" onClick={e => {this.props.addItem(this.state.item); this.setState({item:''})}}>Add</button>
			<br/>
			<br/>
        </div>
        <div>Items (Draggable)</div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <div ref={droppableProvided.innerRef}>
				{this.props.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(draggableProvided, draggableSnapshot) => (
                      <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps} style={{backgroundColor:'gray',margin:'5px', color:'white', ...draggableProvided.draggableProps.style}}>
                          {item.content}
						  &nbsp;&nbsp;&nbsp;
						  <IonClose onClick={e => this.props.delItem(item.id)}>Del</IonClose>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
	return{
		items: state.index.items,
		linkError: state.index.linkError,
	}
};

const mapDispatchToProps = dispatch => {
	return{
		addItem: item => dispatch(addItem(item)),
		delItem: id => dispatch(delItem(id)),
		reorderItem: result => dispatch(reorderItem(result)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Reorder);
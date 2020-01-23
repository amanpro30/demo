import React, {Component} from 'react';
import Player from '../../components/Player/Player';
import Aux from '../../hoc/Aux';
import Reorder from '../Reorder/Reorder';
import {connect} from 'react-redux'; 
import { delItem } from '../../store/actions/index-actions';

class Layout extends Component{
    constructor(props) {
		super(props);
		this.state = {

		};
    }

    end = () => {
        this.props.delItem(this.props.items[0].id);
    }

    render(){
        return(
            <Aux>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-9.5">
                            <Player urllink={this.props.items.length===0 ? " ": this.props.items[0].content} end={this.end}></Player>
                        </div>
                        <div className="col-sm-3">
                            <Reorder></Reorder>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.index.items,
    }
};

const mapDispatchToProps = dispatch => {
	return{
		delItem: id => dispatch(delItem(id)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
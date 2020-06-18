import React from 'react';
import Checkbox from './Checkbox';

class TagSelection extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          checkedItems: new Map(),
        }

        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    this.props.handleChange(item);    
    }

   render () {
       return (
        <div className="inline fields">
        <React.Fragment>
            {
            this.props.tags.map(tag => (
                <label key={tag.id}>
                    <Checkbox name={tag.id} checked={this.state.checkedItems.get(tag.id.toString())} onChange={this.handleChange}/>
                    {tag.name}
                </label>
            ))
            }
        </React.Fragment>
        </div>
    );
    }
}


export default TagSelection;
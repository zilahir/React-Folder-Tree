import React, { Component } from 'react';
import classnames from 'classnames'

import styles from './folderTreeCSS.css'

class TreeNode extends Component {
	static propTypes = {
		id: React.PropTypes.number.isRequired,
		path: React.PropTypes.array.isRequired,
		level: React.PropTypes.number.isRequired,
		children: React.PropTypes.array.isRequired,
		checked: React.PropTypes.number.isRequired,
		filename: React.PropTypes.string.isRequired,
		selected: React.PropTypes.number.isRequired,
		fileComponent: React.PropTypes.func.isRequired,
		folderComponent: React.PropTypes.func.isRequired,
		setName: React.PropTypes.func.isRequired,
		setPath: React.PropTypes.func.isRequired,
		handleCheck: React.PropTypes.func.isRequired,
		folderTextClassName: React.PropTypes.string.isRequired,
		folderTextSelectedClassName: React.PropTypes.string.isRequired,
		showCheckbox: React.PropTypes.bool.isRequired,
		listClassName: React.PropTypes.string.isRequired,
		isEditable: React.PropTypes.bool.isRequired,
	};

	constructor(props) {
    super(props);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.setMyName = this.setMyName.bind(this);
    this.setMyPath = this.setMyPath.bind(this);

    this.state = {
    	level: props.level,
      open: props.open === undefined ? false : props.open,
      children: this.props.children,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.state.children)
      this.setState({children: nextProps.children});
  }

  toggleFolder() {
  		this.setState(prevState => ({ open: !prevState.open }));
  }

  handleCheck(e) {
  	if (e.target.checked)
  		this.props.handleCheck(this.props.path, 1);
  	else
  		this.props.handleCheck(this.props.path, 0);
  }

  setMyName(name) {
  	this.props.setName(this.props.path, name);
  }

  setMyPath() {
  	this.props.setPath(this.props.path);
  }

 	render() {
 		const { fileComponent: FileComponent, folderComponent: FolderComponent } = this.props;
 		if (this.state.children.length > 0) {
	 		return (
	      <div>
	      	<FolderComponent
			  	showCheckbox={this.props.showCheckbox}
				open={this.state.open}
				path={this.props.path}
				level={this.state.level}
				checked={this.props.checked}
				filename={this.props.filename}
				selected={this.props.selected}
				selectMe={this.setMyPath}
				setMyName={this.setMyName}
				handleCheck={this.handleCheck}
				toggleFolder={this.toggleFolder}
				folderTextClassName={this.props.folderTextClassName}
				folderTextSelectedClassName={this.props.folderTextSelectedClassName}
				isEditable={this.props.isEditable}
	      	/>

			  <ul
			  	className={classnames(
					this.props.listClassName,
					styles.listElement,
				  )}
			  >
		        {this.state.open &&
		        	this.state.children.map( (child, index) => {
			        	return (
			        		<TreeNode
					        	id={child.id}
					        	key={child.id}
					        	checked={child.status}
					        	selected={child.selected}
								filename={child.filename}
								open={child.open}
								level={this.state.level + 1}
                    			path={this.props.path.concat(index)}
					        	children={child.children? child.children : []}
					        	fileComponent={FileComponent}
					        	folderComponent={FolderComponent}
								handleCheck={this.props.handleCheck}
								setPath={ path => { this.props.setPath(path) } }
								setName={(path, name) => { this.props.setName(path, name); } }
								listClassName={this.props.listClassName}
								isEditable={this.props.isEditable}
								folderTextSelectedClassName={this.props.folderTextSelectedClassName}
				        	/>
				        )
		        	})
		        }
		      </ul>

	      </div>
	    )
 		} else {
 			return (
	      <FileComponent
		  	isEditable={this.props.isEditable}
			showCheckbox={this.props.showCheckbox}
          	path={this.props.path}
	     	level={this.state.level}
			checked={this.props.checked}
			selected={this.props.selected}
			filename={this.props.filename}
	      	selectMe={this.setMyPath}
			setMyName={this.setMyName}
			handleCheck={this.handleCheck}
	     	/>
	    )
 		}
  }

}

export default TreeNode;

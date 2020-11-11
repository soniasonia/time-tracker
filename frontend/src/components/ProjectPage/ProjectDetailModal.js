import React from "react";
import ProjectActivitiesList from "./ProjectActivitiesList";

const ProjectDetailModal = (props) => {

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

return (
  <div className={showHideClassName}>


  <i className="close icon"></i>
  <div className="header">
  {props.detailInfo.title}
  </div>
  <div className="content">
    <div className="description">
      <p>{props.detailInfo.description}
      <span className="right floated" style={{ marginTop: 20 }}>
            {props.detailInfo.tags.map((tag) => (
              <span key={tag.id} className="ui horizontal label">
                {tag.name}
              </span>
            ))}
          </span></p>
      </div>

    <div className="description">
      <div className="ui header">Total time: {props.displayDuration(props.detailInfo.total_duration)}</div>
       <ProjectActivitiesList activities={props.detailInfo.activities}></ProjectActivitiesList>
    </div>
    </div>
   
  <div className="actions">
    <div className="ui black deny button">
      Nope
    </div>
    <div className="ui positive right labeled icon button">
      Yep, that's me
      <i className="checkmark icon"></i>
    </div>
  </div>
</div>

  );
};

export default ProjectDetailModal ;

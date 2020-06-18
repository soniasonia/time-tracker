import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = (props) => {
  return (
    <div class="ui link cards">
      {props.projects.map(
        ({ id, title, description, total_duration, tags, in_progress }) => (
          <ProjectItem
            title={title}
            description={description}
            time={total_duration}
            tags={props.tags.filter((tag) =>
              tags.some((tagId) => tagId === tag.id)
            )}
            key={id}
            url={props.url}
            id={id}
            updateFunction={props.updateFunction}
            in_progress={in_progress}
          />
        )
      )}
    </div>
  );
};

export default ProjectList;

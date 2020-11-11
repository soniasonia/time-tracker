import React from 'react';


const TagList = props => {

    const all_tags = props.tags.map(({ id, name }) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
          </tr>
        );
      });
    
    return (<table>
                <thead>
                    <th><td>ID</td><td>Name</td></th>
                </thead>
                <tbody>
                    {all_tags}
                </tbody>
            </table>);
}
    
export default TagList;
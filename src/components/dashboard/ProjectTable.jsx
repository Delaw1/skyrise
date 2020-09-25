import React from 'react'
import BACKEND_URL from '../../shared/_helpers/utils'

function ProjectTable({body, handleDelete}) {
    return (
        <table className="prj-list">
            <thead>
                <tr>
                    <th scope="col" className="pl-40">PROJECT NAME</th>
                    <th scope="col" className="w-25">ADDRESS</th>
                    <th scope="col">CITY</th>
                    <th scope="col">DEVELOPER</th>
                    <th scope="col">CONDO</th>
                    <th scope="col">TOWN</th>
                    <th scope="col">COMM</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(body) ?
                    body.length === 0 ? 'No project' :
                    body.map((project, i) =>
                        <tr key={i}>
                            {project.featured ?
                                <td scope="row" data-label="PROJECT NAME">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheckBox3" defaultChecked="checked" />
                                        <label className="custom-control-label pt-1 col-redish" htmlFor="customCheckBox3">
                                            {project.name}
                                        </label>
                                    </div>
                                </td>
                                :
                                <td data-label="PROJECT NAME" className="pl-40">{project.name}</td>
                            }

                            <td data-label="ADDRESS">{project.address}</td>
                            <td scope="row" data-label="CITY">{project.city}</td>
                            <td data-label="DEVELOPER">{project.developer.name}</td>
                            <td data-label="CONDO">{project.condos !== null ? project.condos : '-'}</td>
                            <td data-label="TOWN">{project.townhouse !== null ? project.townhouse : '-'}</td>
                            <td data-label="COMM">{project.commercial !== null ? project.commercial : '-'}</td>
                            <td data-label="Delete" onClick={() => handleDelete(project.id)}>
                                <a href="#" className="float-right" >
                                    <img src={BACKEND_URL + "/images/cross.png"} width={10} height={8} alt="" />
                                </a>
                            </td>
                        </tr>
                    )
                    : 'Loading'}
            </tbody>
        </table>

    )
}

export default ProjectTable

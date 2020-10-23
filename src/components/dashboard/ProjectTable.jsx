import React from 'react'
import BACKEND_URL from '../../shared/_helpers/utils'

function ProjectTable({ body, handleDelete }) {
    return (
        <table className="prj-list">
            <thead>
                <tr>
                    <th width="10%" scope="col" class="pl-40">Project name</th>
                    <th width="10%" scope="col">Commercial</th>
                    <th width="10%" scope="col">Condos</th>
                    <th width="10%" scope="col">Townhouse</th>
                    <th width="30%" scope="col">Address</th>
                    <th width="10%" scope="col">City</th>
                    <th width="20%" scope="col" class="text-right">Developer</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(body) ?
                    body.length === 0 ? '' :
                        body.map((project, i) =>
                            <tr key={i}>
                                <td data-label="Project Name">
                                    <div className="custom-control custom-checkbox">
                                        {project.featured ?
                                            <input type="checkbox" className="custom-control-input" id="customCheckBox2112" checked /> :
                                            <input type="checkbox" className="custom-control-input" id="customCheckBox2112" />}
                                        <input type="checkbox" className="custom-control-input" id="customCheckBox2112" />
                                        <label className="custom-control-label pt-1 text-dark sm" htmlFor="customCheckBox2112">
                                            {project.name}
                                        </label>
                                    </div>

                                </td>
                                <td data-label="Comemrcial">{project.commercial !== null ? project.commercial : '-'}</td>
                                <td data-label="Condos">{project.condos !== null ? project.condos : '-'}</td>
                                <td data-label="Townhouse">{project.townhouse !== null ? project.townhouse : '-'}</td>
                                <td data-label="Address">{project.address !== null ? project.address : '-'}</td>
                                <td data-label="City">{project.city !== null ? project.city : '-'}</td>
                                <td data-label="Developer" class="text-right">{project.developer.name !== null ? project.developer.name : '-'}</td>
                            </tr>
                        )
                    : 'Loading'}
            </tbody>
        </table>

    )
}

export default ProjectTable

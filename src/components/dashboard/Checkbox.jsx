import React, {Fragment} from 'react'

export default function Checkbox({check, click, name, labelClass, id}) {
    return (
        <Fragment>
            <input type="checkbox" className="custom-control-input" id={id}  checked={check} />
                    <label className={labelClass} for={id} onClick={click}>
                      {name}
                  </label>
        </Fragment>
    )
}

import React, {Fragment} from 'react'

export default function Checkbox({check, click, name, labelClass, id, inputClass}) {
    return (
        <Fragment>
            <input type="checkbox" className={inputClass} id={id}  checked={check} />
                    <label className={labelClass} for={id} onClick={click}>
                      {name}
                  </label>
        </Fragment>
    )
}

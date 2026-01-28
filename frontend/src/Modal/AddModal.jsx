import React from 'react'
import { Modal } from 'react-bootstrap'

const AddModal = ({show,handelclose,title,children}) => {
  return (
    <div>
        <Modal show ={show} onHide={handelclose} centered>
            {title &&(
                <h1>{title}</h1>
            )}
            {children &&(
                <div>{children}</div>
            )}

        </Modal>

    </div>
  )
}

export default AddModal

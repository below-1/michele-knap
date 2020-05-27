import React, { useContext, useState } from 'react'
import Dialog from 'mich/components/commons/Dialog'
import InputContext from './InputContext'
import ItemForm from './ItemForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EditItem ({ index, onClose }) {
  const [state, dispatch] = useContext(InputContext);
  const item = state.items[index]
  return (
    <Dialog onClose={onClose}>
      <div className="w-1/3 mx-auto my-12 p-4 bg-white shadow">
        <div className="text-xl font-semibold my-2">Input Item</div>
        <ItemForm 
          id='update-item' 
          submit={data => {
            dispatch({
              type: 'UPDATE_ITEM',
              payload: {
                item: {
                  profit: parseFloat(data.profit),
                  weight: parseFloat(data.weight)
                },
                index
              }
            })
            onClose()
          }}
          default={item}
        ></ItemForm>
        <div>
          <button
            type="submit"
            form="update-item"
            className="appearance-non px-2 py-1 border border-gray-200 font-semibold bg-blue-600 text-white my-2 rounded mr-2"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="appearance-non px-2 py-1 border border-gray-200 font-semibold my-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function CreateItem ({ onClose }) {
  const [state, dispatch] = useContext(InputContext);
  return (
    <Dialog onClose={onClose}>
      <div className="w-1/3 mx-auto my-12 p-4 bg-white shadow">
        <div className="text-xl font-semibold my-2">Input Item</div>
        <ItemForm 
          id='create-item' 
          submit={data => {
            dispatch({
              type: 'ADD_ITEM',
              payload: {
                profit: parseFloat(data.profit),
                weight: parseFloat(data.weight)
              }
            })
            onClose()
          }}
        ></ItemForm>
        <div>
          <button
            type="submit"
            form="create-item"
            className="appearance-non px-2 py-1 border border-gray-200 font-semibold bg-blue-600 text-white my-2 rounded mr-2"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="appearance-non px-2 py-1 border border-gray-200 font-semibold my-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Content ({ onClickCreate, onClickEdit }) {
  const [state, dispatch] = useContext(InputContext)
  const { items } = state
  return (
    <div className="text-center">
      <button
        onClick={onClickCreate}
        className="appearance-non px-4 py-2 font-semibold border rounded-full bg-teal-600 text-white border-gray-200 my-2"
      >
        <span className="mr-2">Tambah Item</span>
        <FontAwesomeIcon 
          icon="pencil-alt"
        />
      </button>
      <table className="border-collapse w-full font-medium text-center my-6 text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pl-4">Item</th>
            <th className="px-2">Profit</th>
            <th className="px-2">Berat</th>
            <th className="pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) => {
              return (
                <tr key={index} className="text-base border-b border-gray-300 font-bold hover:bg-gray-100">
                  <td className="pl-4 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{item.profit}</td>
                  <td className="px-2 py-2">{item.weight}</td>
                  <td className="pr-4 py-2 text-right">
                    <button 
                      onClick={() => onClickEdit(index)}
                      className="appearance-none mr-2"
                    >
                      <FontAwesomeIcon size="sm" icon="pencil-alt"></FontAwesomeIcon>
                    </button>
                    <button 
                      onClick={() => {
                        dispatch({
                          type: 'DELETE_ITEM',
                          payload: index
                        })
                      }}
                      className="appearance-none"
                    >
                      <FontAwesomeIcon size="sm" icon="trash"></FontAwesomeIcon>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function Toggler ({ show, toggle }) {
  return (<div className="flex flex-row justify-between items-center px-4">

    <div className="text-lg font-bold">Items</div>

    <button 
      onClick={toggle}
      className="appearance-non px-2 py-0 border border-gray-200"
    >
      <FontAwesomeIcon 
        icon={ show ? 'caret-left' : 'caret-down' }
        size="lg"
      />
    </button>
  </div>)
}

export default function InputItems () {
  const [ showItems, setShowItems ] = useState(false)
  const [ showCreateItem, setShowCreateItem ] = useState(false)
  const [ updateIndex, setUpdateIndex ] = useState(-1)
  return (
    <div className="py-4 border border-gray-300">
      <Toggler show={showItems} toggle={() => setShowItems(!showItems)} />
      { 
        showItems && 
        <Content 
          onClickCreate={() => setShowCreateItem(true)}
          onClickEdit={index => {
            if (index < 0) {
              return
            }
            setUpdateIndex(index)
          }}
        /> 
      }
      { showCreateItem && <CreateItem onClose={() => setShowCreateItem(false)} /> }
      { updateIndex >= 0 && <EditItem index={updateIndex} onClose={() => setUpdateIndex(-1)} /> }
    </div>
  )
}
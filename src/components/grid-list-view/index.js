import { UilApps, UilListUl } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { setFormat } from "../../redux/format-slice";

const GridListView = () => {
    const dispatch = useDispatch()
    const format = useSelector(state=> state.format.format)

    return (
        <div className='flex gap-1'>
            <button onClick={() => {
                dispatch(setFormat('grid'))
            }}>
                <UilApps size="22" className={(format==='grid')?"fill-second-color ml-3 ":
                                                                "fill-primary-color ml-3 " }
                />
            </button>
            <button onClick={() => {
                dispatch(setFormat('list'))
            }}>
                <UilListUl size="30" className={(format==='list')?"fill-second-color ml-3 ":
                                                                "fill-primary-color ml-3 "}
                 />
            </button>
        </div>
    )
}

export default GridListView;
import { UilApps, UilListUl } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { setFormat } from "../../redux/format-slice";

const GridListView = () => {
    const dispatch = useDispatch()
    const format = useSelector(state=> state.format.format)

    return (
        <div className='hidden lg:block gap-1'>
            <button onClick={() => {
                dispatch(setFormat('grid'))
            }}>
                <UilApps size="22" className={` ml-3 bounce ${format==='grid'?'fill-second-color':'fill-forth-color'}`}
                />
            </button>
            <button onClick={() => {
                dispatch(setFormat('list'))
            }}>
                <UilListUl size="30" className={` ml-3 bounce ${format==='list'?'fill-second-color':'fill-forth-color'}`}
                 />
            </button>
        </div>
    )
}

export default GridListView;
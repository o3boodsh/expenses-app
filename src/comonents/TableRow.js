function TableRow(props) {
    let onDeletHandler = () => {
        props.deleteHandler(props.id);
    }
    return (<tr>
        <td> {props.title} </td>
        <td> {props.date} </td>
        <td>{props.price}  </td>
        <td colSpan="2">{props.descrption} </td>
        <td className="text-right">
            <a href="#" className="delete">
                <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={onDeletHandler}
                />
            </a>
        </td>
    </tr>);
}

export default TableRow;
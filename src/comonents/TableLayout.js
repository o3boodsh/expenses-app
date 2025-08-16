import TableRow from "./TableRow";

function TableLayout(props) {
    let onDeletHandler = (id) => {
        props.deleteExpenseHandler(id);
    }

    return (<div className="row mt-5 mb-5">
        <div className="custom-card ">
            <table className="table ">
                <thead>
                    <tr>
                        <th> Title</th>
                        <th> Date</th>
                        <th>value</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.expenses.map((element) => {
                        return <TableRow
                            key={element.id}
                            id={element.id}
                            title={element.title}
                            date={element.date}
                            price={element.price}
                            descrption={element.descrption}
                            deleteHandler={onDeletHandler}
                        />
                    })}


                </tbody>
            </table>
        </div>
    </div>);
}

export default TableLayout;
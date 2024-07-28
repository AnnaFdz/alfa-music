import "../styles/sidebar.css";
function SideBarChoice({title, children, onClick}) {

    return (
        <>
            <div className="choice" onClick={onClick}>
                {children}
                <span>{title}</span>
            </div>
        </>
    )
}

export default SideBarChoice;
import React from 'react'
import './index.css'

const Sidebar = ({heading, style = {}, children, otherClass}) => {
	const sidebarClassName = `sidebar ${otherClass}`

	return(
		<sidebar className={sidebarClassName} style={style}>
			<div className="sidebar-header">
				{heading}
			</div>
			<div className="sidebar-header-underline"></div>
			<div className="sidebar-list">
				{children}
			</div>
		</sidebar>
	)
}

export default Sidebar

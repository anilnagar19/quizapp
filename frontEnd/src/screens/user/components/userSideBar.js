import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from "react-router-dom";

export const userSideBar = (
	<div>
		<ListItem button component={Link} to="/user/listQuiz">
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="All Quiz" />
		</ListItem>
		{/* <ListItem button component={Link} to="/admin/viewQuiz">
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="View Quiz" />
		</ListItem> */}
	</div>
);

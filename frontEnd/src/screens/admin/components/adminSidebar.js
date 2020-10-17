import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Link } from "react-router-dom";

export const adminSideBar = (
	<div>
		<ListItem button component={Link} to="/admin/createQuiz">
			<ListItemIcon>
				<PlaylistAddIcon />
			</ListItemIcon>
			<ListItemText primary="Create Quiz" />
		</ListItem>
		<ListItem button component={Link} to="/admin/viewQuiz">
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="View Quiz" />
		</ListItem>
	</div>
);

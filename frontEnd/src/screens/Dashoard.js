import clsx from 'clsx';
import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import ListQuiz from './user/listQuiz';
import AttemptTest from './user/attemptTest';
import AddQuiz from './admin/addQuiz';
import QuizList from './admin/quizList';
import AddQuestion from './admin/addQuestion';

import { userSideBar } from './user/components/userSideBar.js';
import { adminSideBar } from './admin/components/adminSidebar.js';

export default function Dashoard(props) {
	const classes = useStyles();
	const location = useLocation();

	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		console.log(location);
	}, []);


	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Quiz
					</Typography>
				</Toolbar>
			</AppBar>
			<Router>
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>

						<Typography variant="h5" component="h2">{location.pathname.includes('user') ? 'User' : 'Admin'}</Typography>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>{location.pathname.includes('user') ? userSideBar : adminSideBar}</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />

					<Container maxWidth="lg" className={classes.container}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={12} lg={12}>
								<Switch>
									<Route path="/user" component={ListQuiz} exact />
									<Route path="/user/listQuiz" component={ListQuiz} />
									<Route path="/user/takeTest" component={AttemptTest} />

									<Route path="/admin" component={AddQuiz} exact />
									<Route path="/admin/viewQuiz" component={QuizList} />
									<Route path="/admin/createQuiz" component={AddQuiz} />
									<Route path="/admin/addQuestion" component={AddQuestion} />
								</Switch>
							</Grid>
						</Grid>
					</Container>
				</main>
			</Router>
		</div>
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));

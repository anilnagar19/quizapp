export default function pickColor() {
	// Array containing colors 
	var colors = [
		'#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#00bcd4', '#4caf50',
		'#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
	];

	// selecting random color 
	let random_color = colors[Math.floor(Math.random() * colors.length)];
	return `${random_color}`
}
const { exec } = require('child_process');
exec('dir', (error, stdout, stderr) => {
	if(error){
		console.error(`error: ${error.message}`);
		return;
	}
	if(stderr){
		console.error(`stderr: ${error.message}`);
	}
	console.log(`stdout: \n${stdout}`);
});

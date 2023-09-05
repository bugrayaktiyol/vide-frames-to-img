const { spawn } = require('child_process');

const inputElement = document.getElementById("videoInput");
const processButton = document.getElementById("processButton");
const kpsValue = document.getElementById("kpsInput");
const qualitySelect = document.getElementById("qualitySelect");
const progressElement = document.getElementById("progress");
const videoList = document.getElementById("videoList");

const runScript = function(videoPath, kps, imgQuality) {
  const pythonProcess = spawn('python', ['./frame.py', videoPath, kps, imgQuality]);
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  return new Promise((res, rej) => {

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      return rej(data);
    });

    pythonProcess.on('close', (code) => {
      if(code != 0) {
        return rej();
      }
      console.log(`child process exited with code ${code}`);
      return res();
    });
  })
}

processButton.addEventListener("click", async () => {

  const selectedFiles = inputElement.files;

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];

    progressElement.innerText = `Processing video ${i + 1} of ${selectedFiles.length}`;

    await runScript(file.path, parseInt(kpsValue.value), parseInt(qualitySelect.value));
    progressElement.innerText = `Video ${i + 1} has been completed`;
  }
  progressElement.innerText = "All videos have been processed";
});


inputElement.addEventListener("change", displayVideoInfo);

function displayVideoInfo() {
  const curFiles = inputElement.files;
  const list = document.createElement("ul");

  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    list.appendChild(para);
  } else {
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      
      para.textContent = `Video name: ${file.name}`;
      listItem.appendChild(para);

      list.appendChild(listItem);
    }
  }

  while (videoList.firstChild) {
    videoList.removeChild(videoList.firstChild);
  }

  videoList.appendChild(list);
}
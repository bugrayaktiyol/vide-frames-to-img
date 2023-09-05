import os
import sys
import cv2


VIDEO_PATH = sys.argv[1]
KPS = int(sys.argv[2])
IMG_QUALITY = int(sys.argv[3])

cap = cv2.VideoCapture(VIDEO_PATH)

fps = round(cap.get(cv2.CAP_PROP_FPS))
hop = round(fps / KPS)
curr_frame = 0

dir = os.path.join(os.path.dirname(VIDEO_PATH), os.path.splitext(os.path.basename(VIDEO_PATH))[0])
j = 1

if not os.path.exists(dir):
    os.mkdir(dir)

while(True):
    ret, frame = cap.read()
    if ret:
        if curr_frame % hop == 0:
            cv2.imwrite(os.path.join(dir, f'{os.path.splitext(os.path.basename(VIDEO_PATH))[0]}-{j:03d}.jpg'), frame, [int(cv2.IMWRITE_JPEG_QUALITY), IMG_QUALITY])
            j += 1
        curr_frame += 1
    else:
        break

cap.release()
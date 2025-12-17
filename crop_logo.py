from PIL import Image
import numpy as np

# Load the image
img_path = r'c:\Users\sigfr\OneDrive\Desktop\SAntComm_web\wix-replica\assets\img\santcom_logo.png'
img = Image.open(img_path)

# Convert to RGBA
img = img.convert('RGBA')
data = np.array(img)

print(f'Image size: {img.size}')

# Old background color (dark gray from original)
old_bg = np.array([65, 63, 61, 255])

# New background color to match page (rgb(20, 20, 22))
new_bg = np.array([20, 20, 22, 255])

# Replace old background with new background
# Find pixels similar to old background
tolerance = 30
diff = np.abs(data - old_bg)
is_background = np.all(diff <= tolerance, axis=2)

# Replace background pixels
data[is_background] = new_bg

# Create new image
new_img = Image.fromarray(data, 'RGBA')
new_img.save(img_path)

print(f'Background color changed from {old_bg[:3]} to {new_bg[:3]}')
print('Logo updated successfully!')

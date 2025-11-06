import requests
import os

# Create images directory
os.makedirs('wix-images', exist_ok=True)

# All image URLs from Wix site
images = {
    'hero-bg.jpg': 'https://static.wixstatic.com/media/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg',
    'empower-left.jpg': 'https://static.wixstatic.com/media/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg',
    'transform-right.jpg': 'https://static.wixstatic.com/media/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg',
    'stats-bg.jpg': 'https://static.wixstatic.com/media/c837a6_d11c6c437c0f4feb9de8591b42ead168~mv2.jpg',
    'logo1.png': 'https://static.wixstatic.com/media/c837a6_def52106c3644d81827598294297c6b6~mv2.png',
    'logo2.png': 'https://static.wixstatic.com/media/c837a6_c30ebf8c66f24efaaa20d000079f76c7~mv2.png',
    'logo3.png': 'https://static.wixstatic.com/media/c837a6_02aaf8e59c6647aaac518fec8d5dd3d3~mv2.png',
    'logo4.png': 'https://static.wixstatic.com/media/c837a6_affc426fdd1a4284b30463713e36b567~mv2.png',
    'empower-bottom.jpg': 'https://static.wixstatic.com/media/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg',
    'video-poster.png': 'https://static.wixstatic.com/media/c837a6_159e86d4444649fcada7bff77ae670adf000.png',
    'linkedin.png': 'https://static.wixstatic.com/media/8efda6398c724b5ea342287bfe3f5ed0.png',
    'facebook.png': 'https://static.wixstatic.com/media/ce6ec7c11b174c0581e20f42bb865ce3.png',
    'twitter.png': 'https://static.wixstatic.com/media/444f49eac2e348f89128293b0c6432fd.png',
}

print("Downloading Wix images...")
for filename, url in images.items():
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            filepath = os.path.join('wix-images', filename)
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"OK Downloaded: {filename}")
        else:
            print(f"FAIL: {filename} (Status {response.status_code})")
    except Exception as e:
        print(f"ERROR downloading {filename}: {e}")

print("\nAll images downloaded to wix-images/")

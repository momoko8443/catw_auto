# catw_auto
Save timesheet of CATW automatically, only for HPE managed cloud team internal usage.   

# How to use

 1. **Step 0**
 
		perpare VM which installed docker as a host
		
		set proxy for docker
		
		ssh the host
 2. **Step 1**
		 
		 mkdir ~/your_space/  
		 
		 cd ~/your_space
 3. **Step 2**
		 
		 git clone https://github.com/momoko8443/catw_auto.git
		 
		 modify config.json to set your employeeId and catw password
 4. **Step 3**
		
		docker build -t catw_auto_image .
		
		docker images //make sure catw_auto_image is on the images' list
		
		docker run -d -p 3000:3000 --name catw_auto catw_auto_image
		
		docker ps //make sure catw_auto is on the containers' list
 5. **Step 4**
    
    	visit http://host:3000 to verify the snapshots of automatic operations. 
    
  
# Tips

 - Saving operation will launch immediately when container starts  
 - Script will be run at 17:00 on every Monday,  Wednesday and Friday

 

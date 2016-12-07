# catw_auto
Save timesheet of CATW automatically, only for HPE managed cloud team internal usage.   

# Workflow
 1. login account
 2. copy current week's timesheet to next week.
 3. save current week's timesheet.
 4. repeat 1~3 every week. 

# How to use
 1. **Step 1**
 		Make sure your current week's timesheet was filled.			  

 2. **Step 2**
 
		perpare VM which installed docker
		
		set proxy for docker
		
		ssh VM
 3. **Step 3**
		 
		 mkdir ~/your_dir/  
		 
		 cd ~/your_dir
 4. **Step 4**
		 
		 git clone https://github.com/momoko8443/catw_auto.git
		 
		 modify config.json to set your employeeId and catw password
 5. **Step 5**
		
		docker build -t catw_auto_image .
		
		docker images //make sure catw_auto_image is on the images' list
		
		docker run -d -p 3000:3000 --name catw_auto catw_auto_image
		
		docker ps //make sure catw_auto is on the containers' list
 6. **Step 6**
    	wait about 5 minutes.
    	visit http://host:3000 to verify the snapshots of automatic operations. 
    
  
# Tips

 - Saving operation will be launched immediately when container starts.  
 - Script will be run at 17:00 on every Monday,  Wednesday and Friday.
 - It takes about 5 minutus to finish once saving operation.
 
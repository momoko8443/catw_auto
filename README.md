# catw_auto
Save timesheet of CATW automatically, only for HPE managed cloud team internal usage.   

# Workflow
 0. login account
 1. copy current week's timesheet to next week.
 2. save current week's timesheet.
 3. repeat 0~2 every week. 

# How to use
 0. **Step 0**
 		Make sure your current week's timesheet was filled.			  

 1. **Step 1**
 
		perpare VM which installed docker
		
		set proxy for docker
		
		ssh VM
 2. **Step 2**
		 
		 mkdir ~/your_dir/  
		 
		 cd ~/your_dir
 3. **Step 3**
		 
		 git clone https://github.com/momoko8443/catw_auto.git
		 
		 modify config.json to set your employeeId and catw password
 4. **Step 4**
		
		docker build -t catw_auto_image .
		
		docker images //make sure catw_auto_image is on the images' list
		
		docker run -d -p 3000:3000 --name catw_auto catw_auto_image
		
		docker ps //make sure catw_auto is on the containers' list
 5. **Step 5**
    	wait about 5 minutes.
    	visit http://host:3000 to verify the snapshots of automatic operations. 
    
  
# Tips

 - Saving operation will be launched immediately when container starts.  
 - Script will be run at 17:00 on every Monday,  Wednesday and Friday.
 - It takes about 5 minutus to finish once saving operation.
 
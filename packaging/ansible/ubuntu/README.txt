Install git
	sudo apt install git
install ansible
	sudo apt install ansible
install ansible modules 
	sudo ansible-galaxy collection install ansible.utils
Edit /etc/ansible/hosts and add 127.0.0.1
Clone iHRIS github repository
	git clone https://github.com/iHRIS/iHRIS.git
Run the installer
	cd iHRIS/packaging/ansible/ubuntu/
	sudo bash run.sh
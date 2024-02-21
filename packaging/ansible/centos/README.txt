install ansible
	sudo yum install epel-release
	sudo yum install ansible
install ansible modules 
	ansible-galaxy collection install ansible.utils
	ansible-galaxy collection install community.postgresql
Edit /etc/ansible/hosts and add 127.0.0.1

# IHRIS Installation Using Ansible

Update package list with below command:

```sh
sudo apt update
```

Install git:

```sh
sudo apt install git
```

Install ansible:

```sh
sudo apt install ansible
```

Open file `/etc/ansible/hosts` with your favorite editor and add `127.0.0.1` at the end of the file. If the folder ansible is missing, then create the folder ansible with below command:

```sh
sudo mkdir /etc/ansible
```

Then open the file `/etc/ansible/hosts` and continue with above editing.

Install ansible modules that we will be using:

```sh
sudo ansible-galaxy collection install ansible.utils
```

```sh
sudo ansible-galaxy collection install community.postgresql
```

Clone iHRIS GitHub repository:

```sh
git clone https://github.com/iHRIS/iHRIS.git
```

Now run the iHRIS ansible installer:

```sh
cd iHRIS/packaging/ansible/ubuntu
```

```sh
sudo bash run.sh
```

After the above command is done running, iHRIS will be installed under the directory `/var/lib/iHRIS`. Use the below commands to stop, start, and restart it:

```sh
sudo service ihris stop
```

```sh
sudo service ihris start
```

```sh
sudo service ihris restart
```

To access iHRIS, open your browser and type the address `localhost:3000` to access iHRIS. The default username is `admin@ihris.org` and the password is `ihris`.

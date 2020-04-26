# HomeMenuScreen

- Master branch : production
- Staging branch : development
- Default branch : staging 

Steps to start:

- git clone https://github.com/bilalmalik4321/HomeMenuScreen.git
- git checkout staging
- git checkout -b newBranchNew 


Steps to merge:

- git add .
- git commit -m 'commit message or what has been done'
- git branch
- git checkout staging 
- git pull
- git checkout your_feature_branch_name
- git merge staging

(this will pull the most update from staging and merge into your branch)

Steps to do a pull request:

- first complete 'Steps to merge'
- git push -u origin your_feature_branch_name
- make a pull request into **staging** branch NOT master NOT master. 




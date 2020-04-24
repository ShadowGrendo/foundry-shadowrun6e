# Development Log for Shadowrun 6th World FoundryVTT System Module

Are systems modules? are they just systems? 

## 4.24.2020, nevenall

I want to create some packs for this, but not in a public repo. If I make the repo private then I'd have to do a local install right? 
Can I install the system from my local repo? that might be idea. Can try out stuff. Or, include the packs locally and gitignore them than we can keep the repo public. Have to careful not to include them in the public manifest though. if you have a missing pack in your system.json what happens when you update the system? 

Main changes for 6th world, 

- glitches and critical glitches
- remove limits
- changes to edge
  - include the various ways you can use it before and after a roll
  - attack rating and defense values
- simplified skills
- character sheet, cyberize it a bit, augmentedui might be great. colors and fonts. could use ghosting fonts/colors



lots of rolling related stuff. And some character stuff. 


## naming questions

Is there a reason to include the edition number in naming? how global is the game global?
Like will there be conflicts if we just name stuff shadowrun or SR? because when 7th ed comes around its going to be a pain to rename everything. I assume stuff is isolated to the game that is currently launched. 

I think games are isolated enough that we can drop the version from the system. 


## Local Development 

Also, the install system is pretty much just a copy of the repo, which means we could make the installed system folder the repo and even attach to the app for debugging. 



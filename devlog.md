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


### naming questions

Is there a reason to include the edition number in naming? how global is the game global?
Like will there be conflicts if we just name stuff shadowrun or SR? because when 7th ed comes around its going to be a pain to rename everything. I assume stuff is isolated to the game that is currently launched. 

I think games are isolated enough that we can drop the version from the system. 


## Local Development 

Also, the install system is pretty much just a copy of the repo, which means we could make the installed system folder the repo and even attach to the app for debugging. 


### 4.25.2020, nevenall

got the rename done. Tried to switch to TabsV2, but it didn't go real well. Switched back for now. 
going to try editing the template for 6th e

need defense rating and attack rating

  Close: 0-3 meters Every gun has this one, though some are actually less effective here because they’re so bulky.

  Near: 4-50 meters This is the sweet spot across the board. All ranged weapons can get into this range. How effective they are is a whole other question.

  Medium: 51-250 meters You need some barrel length to be effective
  here. Some smaller arms can get here, but hitting a target falls more into the realm of trickery and magic than skill.

  Far: 251-500 meters Welcome to the land of longarms. This is the place where size matters—well, at least the length of the barrel.

  Extreme: 500+ Sure, your tricked-out Colt M-23 can get here,
  barely, but that Ranger Arms revels in these ranges.

these are defined range categories and we can include them in the game. Maybe a rules config somewhere.

Also include conditions. Confused, Shocked, etc...

Ok, work backwards from the character sheet to the template, because editing the template will make all kinds of errors and such. 

Personal Data

Attributes (current, max, temp adjustments)
	all the attributes
	edge & edge points
	composure
	judge intentions
	…
	lift/carry
	awakened?
	? include stuff like drain and other shortcuts ?
	
Skills (rank, attribute, [Pool], specialty, expertise)
	There is a small enough list I think we can just show them all

Combat
	movement
	armor
		Defense rating
	ranged
		dv, mode, close, near, far, extreme, ammo
	close combat
		unarmed - dv, close ar
	
Condition Monitor

	Physical Damage
		Boxes 0-18, overflow damage, (just a number, I think)
	Stun Damage
		Boxes 0 -12
	
	Statuses
		Blinded I, II or III
		Burning #
		Chilled
		Confused #
		Corrosive #
		Cover I, II, III, or IV
		Dazed
		Deafened I, II, or III
		…and so on. Can we get these to update reactively to and from the token? that would be sweet

Qualities
	your karma qualities, good and bad
	
Ids/lifestyle/wealth ?social?
	Ids, lifestyle, money reputation, heat,…etc

Contacts
	list of contacts
	
	

Then there are all the more details sections about your specific kick. 
Equipment, matrix, magic, cyberware, adept powers…all that.

start simple, all we really need is the ability to track our attributes and skills and stuff and roll arbitrary dice with or without explodes. and track damage. 

# Untested Items _(UNFINISHED DOCUMENTATION)_
### Note: This was written on 12/11/2023, so these bugs may be resolved, so please delete this file when you fix the listed functions (Not all issues are inherited from semester to semester).
## UseEffect()
* Any code using the useEffect() React Hook is untested and should be tested by the time the **Search** function starts working or with your DevTools (Ctrl + Shift + I).
# Nonfunctional or Buggy Items
## ***(IMPORTANT!!!!!!!)*** Search Function
* All searching is completely not functional
## Auth0
* Currently redirects if user is not part of ATC organization to login/register pages. Implemented condition to check if user is part of ATC, but user's role does not match role parameters. Need to specify page it redirects to.
* Cannot fetch email from Auth0's database and then pass that email as an argument to check what role that email is tied to within our ATC database for this step.

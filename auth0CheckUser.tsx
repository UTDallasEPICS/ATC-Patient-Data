import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

type roleAndAllowed = {
    allowed: boolean,
    role?: string,
}

/*
    We will need to wrap the useUser hook that the auth0 package gives us: https://github.com/auth0/nextjs-auth0#consume-authentication

    Basically, we need our own hook that will call that hook, use user.email to load the info we have in our database, and  then thats the user object that we return

    To write custom hooks: https://react.dev/learn/reusing-logic-with-custom-hooks

    Explaination:
        This function SHOULD be implemented within every route except the initial '/' route.
        It checks the see if a user is logged in, otherwise it redirects them to the initial DONE
        ('login') page. Also checks to see if the user is the correct role otherwise they are
        redirected to the login page.
    Parameter:
        usersAllowed is a string array of user roles that are allowed. Example:
            ["Student", "Technician", "Admin"]
    Returns:
        True if the user is signed in and has the correct permissions, otherwise false.
    Implementation:
        if(!CheckUser(["Admin"])) return(<div>Redirecting...</div>);
*/


export default function CheckUser(rolesAllowed?: String[]) : roleAndAllowed {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    //if the individual is not a user, 
    if (!user)
    {
        router.push('/api/auth/login?returnTo=/');
        return{
            'allowed': false,
            'role': null,
        };
    }

    //Need to write code to pull the user's email from Auth0's database, and then pass that email as an argument to check what role that email is tied to within our ATC database


    const typedUser = User;

    // Check if the user's role is not included in the specified roles
    if (
        rolesAllowed &&
        rolesAllowed.length > 0 &&
        typedUser.EmployeeProfile &&
        !rolesAllowed.includes(typedUser.EmployeeProfile.role)
    ) {
        router.push('/unauthorized'); // Redirect to an unauthorized page or handle it accordingly
        return {
            'allowed': false,
            'role': typedUser.EmployeeProfile.role,
        };
    }

    // If the user's role is allowed or there is no role information
    return {
        'allowed': true,
        'role': typedUser.EmployeeProfile ? typedUser.EmployeeProfile.role : null,
    };
}
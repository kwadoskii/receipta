import auth from "../api/auth";

const useUser = () => {
  const user = auth.getAuthUser();
  return user;
};

export default useUser;

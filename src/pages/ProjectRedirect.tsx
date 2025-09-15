import { Navigate, useParams } from "react-router-dom";

const ProjectRedirect = () => {
  const { slug } = useParams<{ slug: string }>();

  return <Navigate to={`/work/${slug}`} replace />;
};

export default ProjectRedirect;

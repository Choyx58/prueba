import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import * as axios from 'axios';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  padding: 2rem;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Loader = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.color};
`;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { list: products, status, error} = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(6); // cuántos productos mostrar inicialmente
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderBy, setOrderBy] = useState("default");
  const [categories, setCategories] = useState([]);
  const loaderRef = useRef();
  
  // Obtener categorías
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategories(res.data));
  }, []);

  // Obtener productos
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Filtrar y ordenar
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (orderBy === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (orderBy === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (orderBy === "nameAsc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (orderBy === "nameDesc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  };

  const filteredProducts = useMemo(() => {
  let filtered = [...products];

  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }


  if (orderBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (orderBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (orderBy === "name-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (orderBy === "name-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filtered;
}, [products, selectedCategory, orderBy]);
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Scroll infinito con IntersectionObserver
  const loadMore = useCallback(() => {
    if (visibleCount < filteredProducts.length) {
      setVisibleCount((prev) => prev + 6);
    }
  }, [visibleCount, filteredProducts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const target = loaderRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadMore]);

  if (status === "loading") {
    return <p>Cargando productos...</p>;
  }

  if (status === "failed") {
    return (
      <>
        <Header />
        <Container>
          <h2>Error al cargar productos</h2>
          <p>Ocurrió un problema al conectar con la API.</p>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={() => dispatch(fetchProducts())}>Reintentar</button>
        </Container>
      </>
    );
  }

  if (status === "succeeded") {
  return (
    <>
      <Header />

      <Container>
        <h2>Catálogo de Productos</h2>
        <Filters>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            id="orderSelect"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
          </select>
        </Filters>

        {categories.length === 0 && (
        <p style={{ color: "red" }}>No se pudieron cargar las categorías</p>
        )}

        <Grid>
        {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </Grid>

        {/* Loader al fondo de la página */}
        <Loader ref={loaderRef}>
          {visibleCount < filteredProducts.length
            ? "Cargando más productos..."
            : "No hay más productos para mostrar"}
        </Loader>
      </Container>
    </>
  );
}
};

export default ProductsPage;
import {
  updateInquiryStatus,
  updateSiteConfig,
  saveApplication,
  saveProduct,
  saveResource,
} from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function textValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  return "";
}

export default async function AdminPage() {
  const [siteConfig, applications, products, resources, inquiries] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.application.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.resource.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="container" style={{ padding: "32px 0 96px" }}>
      <div className="card" style={{ padding: 28 }}>
        <div className="eyebrow">Admin</div>
        <h1 className="sectionTitle">Rumos Content Operations</h1>
        <p className="sectionLead">
          관리자 영역은 기본 인증으로 보호되며, 메인/애플리케이션/제품/자료실/문의 상태를 관리합니다.
        </p>
      </div>

      <section className="section">
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <form action={updateSiteConfig} className="card stack" style={{ padding: 24 }}>
            <h2 style={{ margin: 0 }}>Site Config</h2>
            <div className="twoCol">
              <div className="field">
                <label htmlFor="heroTitleKo">Hero Title KO</label>
                <input id="heroTitleKo" name="heroTitleKo" defaultValue={siteConfig?.heroTitleKo} />
              </div>
              <div className="field">
                <label htmlFor="heroTitleEn">Hero Title EN</label>
                <input id="heroTitleEn" name="heroTitleEn" defaultValue={siteConfig?.heroTitleEn} />
              </div>
            </div>
            <div className="twoCol">
              <div className="field">
                <label htmlFor="heroDescriptionKo">Hero Description KO</label>
                <textarea
                  id="heroDescriptionKo"
                  name="heroDescriptionKo"
                  defaultValue={siteConfig?.heroDescriptionKo}
                />
              </div>
              <div className="field">
                <label htmlFor="heroDescriptionEn">Hero Description EN</label>
                <textarea
                  id="heroDescriptionEn"
                  name="heroDescriptionEn"
                  defaultValue={siteConfig?.heroDescriptionEn}
                />
              </div>
            </div>
            <div className="twoCol">
              <div className="field">
                <label htmlFor="storyBodyKo">Story KO</label>
                <textarea id="storyBodyKo" name="storyBodyKo" defaultValue={siteConfig?.storyBodyKo} />
              </div>
              <div className="field">
                <label htmlFor="storyBodyEn">Story EN</label>
                <textarea id="storyBodyEn" name="storyBodyEn" defaultValue={siteConfig?.storyBodyEn} />
              </div>
            </div>
            <div className="twoCol">
              <div className="field">
                <label htmlFor="seoTitleKo">SEO Title KO</label>
                <input id="seoTitleKo" name="seoTitleKo" defaultValue={siteConfig?.seoTitleKo} />
              </div>
              <div className="field">
                <label htmlFor="seoTitleEn">SEO Title EN</label>
                <input id="seoTitleEn" name="seoTitleEn" defaultValue={siteConfig?.seoTitleEn} />
              </div>
            </div>
            <div className="twoCol">
              <div className="field">
                <label htmlFor="seoDescriptionKo">SEO Description KO</label>
                <textarea
                  id="seoDescriptionKo"
                  name="seoDescriptionKo"
                  defaultValue={siteConfig?.seoDescriptionKo}
                />
              </div>
              <div className="field">
                <label htmlFor="seoDescriptionEn">SEO Description EN</label>
                <textarea
                  id="seoDescriptionEn"
                  name="seoDescriptionEn"
                  defaultValue={siteConfig?.seoDescriptionEn}
                />
              </div>
            </div>
            <button type="submit" className="button primary">
              Save Site Config
            </button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <div className="stack">
            <h2 style={{ margin: 0 }}>Applications</h2>
            {applications.map((application) => (
              <form key={application.id} action={saveApplication} className="card stack" style={{ padding: 24 }}>
                <input type="hidden" name="id" value={application.id} />
                <div className="twoCol">
                  <div className="field">
                    <label>Slug</label>
                    <input name="slug" defaultValue={application.slug} />
                  </div>
                  <div className="field">
                    <label>Sort Order</label>
                    <input name="sortOrder" type="number" defaultValue={application.sortOrder} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Title KO</label>
                    <input name="titleKo" defaultValue={application.titleKo} />
                  </div>
                  <div className="field">
                    <label>Title EN</label>
                    <input name="titleEn" defaultValue={application.titleEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Summary KO</label>
                    <textarea name="summaryKo" defaultValue={application.summaryKo} />
                  </div>
                  <div className="field">
                    <label>Summary EN</label>
                    <textarea name="summaryEn" defaultValue={application.summaryEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Bullets KO</label>
                    <textarea name="bulletsKo" defaultValue={textValue(application.bulletsKo)} />
                  </div>
                  <div className="field">
                    <label>Bullets EN</label>
                    <textarea name="bulletsEn" defaultValue={textValue(application.bulletsEn)} />
                  </div>
                </div>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="checkbox" name="published" defaultChecked={application.published} />
                  Published
                </label>
                <button type="submit" className="button primary">
                  Save Application
                </button>
              </form>
            ))}
            <form action={saveApplication} className="card stack" style={{ padding: 24 }}>
              <h3 style={{ margin: 0 }}>New Application</h3>
              <div className="twoCol">
                <div className="field">
                  <label>Slug</label>
                  <input name="slug" placeholder="new-application" />
                </div>
                <div className="field">
                  <label>Sort Order</label>
                  <input name="sortOrder" type="number" defaultValue={99} />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Title KO</label>
                  <input name="titleKo" />
                </div>
                <div className="field">
                  <label>Title EN</label>
                  <input name="titleEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Summary KO</label>
                  <textarea name="summaryKo" />
                </div>
                <div className="field">
                  <label>Summary EN</label>
                  <textarea name="summaryEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Bullets KO</label>
                  <textarea name="bulletsKo" />
                </div>
                <div className="field">
                  <label>Bullets EN</label>
                  <textarea name="bulletsEn" />
                </div>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="published" defaultChecked />
                Published
              </label>
              <button type="submit" className="button primary">
                Create Application
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <div className="stack">
            <h2 style={{ margin: 0 }}>Products</h2>
            {products.map((product) => (
              <form key={product.id} action={saveProduct} className="card stack" style={{ padding: 24 }}>
                <input type="hidden" name="id" value={product.id} />
                <div className="twoCol">
                  <div className="field">
                    <label>Slug</label>
                    <input name="slug" defaultValue={product.slug} />
                  </div>
                  <div className="field">
                    <label>Image URL</label>
                    <input name="imageUrl" defaultValue={product.imageUrl ?? ""} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Name KO</label>
                    <input name="nameKo" defaultValue={product.nameKo} />
                  </div>
                  <div className="field">
                    <label>Name EN</label>
                    <input name="nameEn" defaultValue={product.nameEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Summary KO</label>
                    <textarea name="summaryKo" defaultValue={product.summaryKo} />
                  </div>
                  <div className="field">
                    <label>Summary EN</label>
                    <textarea name="summaryEn" defaultValue={product.summaryEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Content KO</label>
                    <textarea name="contentKo" defaultValue={product.contentKo} />
                  </div>
                  <div className="field">
                    <label>Content EN</label>
                    <textarea name="contentEn" defaultValue={product.contentEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>SEO Title KO</label>
                    <input name="seoTitleKo" defaultValue={product.seoTitleKo ?? ""} />
                  </div>
                  <div className="field">
                    <label>SEO Title EN</label>
                    <input name="seoTitleEn" defaultValue={product.seoTitleEn ?? ""} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>SEO Description KO</label>
                    <textarea name="seoDescriptionKo" defaultValue={product.seoDescriptionKo ?? ""} />
                  </div>
                  <div className="field">
                    <label>SEO Description EN</label>
                    <textarea name="seoDescriptionEn" defaultValue={product.seoDescriptionEn ?? ""} />
                  </div>
                </div>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="checkbox" name="published" defaultChecked={product.published} />
                  Published
                </label>
                <button type="submit" className="button primary">
                  Save Product
                </button>
              </form>
            ))}
            <form action={saveProduct} className="card stack" style={{ padding: 24 }}>
              <h3 style={{ margin: 0 }}>New Product</h3>
              <div className="twoCol">
                <div className="field">
                  <label>Slug</label>
                  <input name="slug" placeholder="new-product" />
                </div>
                <div className="field">
                  <label>Image URL</label>
                  <input name="imageUrl" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Name KO</label>
                  <input name="nameKo" />
                </div>
                <div className="field">
                  <label>Name EN</label>
                  <input name="nameEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Summary KO</label>
                  <textarea name="summaryKo" />
                </div>
                <div className="field">
                  <label>Summary EN</label>
                  <textarea name="summaryEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Content KO</label>
                  <textarea name="contentKo" />
                </div>
                <div className="field">
                  <label>Content EN</label>
                  <textarea name="contentEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>SEO Title KO</label>
                  <input name="seoTitleKo" />
                </div>
                <div className="field">
                  <label>SEO Title EN</label>
                  <input name="seoTitleEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>SEO Description KO</label>
                  <textarea name="seoDescriptionKo" />
                </div>
                <div className="field">
                  <label>SEO Description EN</label>
                  <textarea name="seoDescriptionEn" />
                </div>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="published" defaultChecked />
                Published
              </label>
              <button type="submit" className="button primary">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <div className="stack">
            <h2 style={{ margin: 0 }}>Resources</h2>
            {resources.map((resource) => (
              <form key={resource.id} action={saveResource} className="card stack" style={{ padding: 24 }}>
                <input type="hidden" name="id" value={resource.id} />
                <div className="twoCol">
                  <div className="field">
                    <label>Slug</label>
                    <input name="slug" defaultValue={resource.slug} />
                  </div>
                  <div className="field">
                    <label>File URL</label>
                    <input name="fileUrl" defaultValue={resource.fileUrl ?? ""} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Title KO</label>
                    <input name="titleKo" defaultValue={resource.titleKo} />
                  </div>
                  <div className="field">
                    <label>Title EN</label>
                    <input name="titleEn" defaultValue={resource.titleEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Excerpt KO</label>
                    <textarea name="excerptKo" defaultValue={resource.excerptKo} />
                  </div>
                  <div className="field">
                    <label>Excerpt EN</label>
                    <textarea name="excerptEn" defaultValue={resource.excerptEn} />
                  </div>
                </div>
                <div className="twoCol">
                  <div className="field">
                    <label>Body KO</label>
                    <textarea name="bodyKo" defaultValue={resource.bodyKo} />
                  </div>
                  <div className="field">
                    <label>Body EN</label>
                    <textarea name="bodyEn" defaultValue={resource.bodyEn} />
                  </div>
                </div>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="checkbox" name="published" defaultChecked={resource.published} />
                  Published
                </label>
                <button type="submit" className="button primary">
                  Save Resource
                </button>
              </form>
            ))}
            <form action={saveResource} className="card stack" style={{ padding: 24 }}>
              <h3 style={{ margin: 0 }}>New Resource</h3>
              <div className="twoCol">
                <div className="field">
                  <label>Slug</label>
                  <input name="slug" placeholder="new-resource" />
                </div>
                <div className="field">
                  <label>File URL</label>
                  <input name="fileUrl" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Title KO</label>
                  <input name="titleKo" />
                </div>
                <div className="field">
                  <label>Title EN</label>
                  <input name="titleEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Excerpt KO</label>
                  <textarea name="excerptKo" />
                </div>
                <div className="field">
                  <label>Excerpt EN</label>
                  <textarea name="excerptEn" />
                </div>
              </div>
              <div className="twoCol">
                <div className="field">
                  <label>Body KO</label>
                  <textarea name="bodyKo" />
                </div>
                <div className="field">
                  <label>Body EN</label>
                  <textarea name="bodyEn" />
                </div>
              </div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="published" defaultChecked />
                Published
              </label>
              <button type="submit" className="button primary">
                Create Resource
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ width: "100%", padding: 0 }}>
          <div className="stack">
            <h2 style={{ margin: 0 }}>Inquiries</h2>
            <div className="card" style={{ padding: 8 }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>{inquiry.id}</td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td style={{ maxWidth: 320 }}>{inquiry.message}</td>
                      <td>
                        <form action={updateInquiryStatus}>
                          <input type="hidden" name="id" value={inquiry.id} />
                          <select name="status" defaultValue={inquiry.status}>
                            <option value="RECEIVED">RECEIVED</option>
                            <option value="REVIEWING">REVIEWING</option>
                            <option value="REPLIED">REPLIED</option>
                          </select>
                          <button type="submit" className="button secondary" style={{ marginTop: 8 }}>
                            Update
                          </button>
                        </form>
                      </td>
                      <td>{new Date(inquiry.createdAt).toLocaleString("ko-KR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

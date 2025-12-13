import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
            JS Popup Sale
          </Link>
        </div>
      </header>
      
      <main className="flex-1 py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">Terms of Use</h1>
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12">Last updated: January 2025</p>
          
          <div className="space-y-6 sm:space-y-8">
            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">1. License</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                JS Popup Sale is provided as open-source software under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">2. Disclaimer of Warranty</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">3. Limitation of Liability</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">4. Usage</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                You may use this software for any purpose, including commercial applications. No attribution is required, though it is appreciated.
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">5. Support</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                Support is provided on a best-effort basis through GitHub Issues. There is no guarantee of response time or resolution.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
